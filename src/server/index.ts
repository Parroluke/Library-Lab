import { world, EntityDamageCause, EntityHurtAfterEvent, system, MinecraftEntityTypes, Player, Vector, EntityInventoryComponent, ItemLockMode, EntityItemComponent, Block, ItemStack, Entity, EntityHitEntityAfterEvent, EntityHealthComponent } from "@minecraft/server";
import { database } from "../library/build/databaseBuilder.js";
import { ActionFormData, MessageFormData  } from "@minecraft/server-ui";
import { PInvUtil } from "../library/util/inv/InvUtil.js";
import { ItemUtil } from "../library/util/inv/itemUtil.js";

world.sendMessage('started')


//나침반 이동
world.afterEvents.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.itemStack;    

    if(item.typeId == 'minecraft:compass') source.teleport(e.source.getBlockFromViewDirection().block.location, {"dimension":e.source.dimension, "rotation":{"x":source.getRotation().x,"y":e.source.getRotation().y}})
});

database.addEntityV("attackCool", "number", MinecraftEntityTypes.player);
database.addEntityV("selectedSlot", "number", MinecraftEntityTypes.player);

system.runInterval(()=>{
    world.getAllPlayers().forEach(pl=>{
        const pInv = new PInvUtil(pl);
        const mainhand = pInv.getMainhand();
        const attackCool = pl?.getDynamicProperty('attackCool') as number;
        const selectedSlotData = pl.getDynamicProperty("selectedSlot") as number;

        pl.setDynamicProperty("selectedSlot", pl.selectedSlot);
        if(attackCool>0) pl.setDynamicProperty('attackCool', attackCool - 1);
        else if(is_weapon(mainhand)) pInv.setMainhand(new ItemUtil(mainhand).setLockMode(ItemLockMode.none))

        pl.onScreenDisplay.setActionBar(`${attackCool}, ${selectedSlotData}`)
        // selectedSlot 이 변경되었을 경우
        if(selectedSlotData!==pl.selectedSlot) {
            const previousItem = pInv.getItem(selectedSlotData);
            if(is_weapon(previousItem)) {
                const noneLockItem = new ItemUtil(previousItem).setLockMode(ItemLockMode.none)
                pInv.setItem(selectedSlotData, noneLockItem)
            }

            if(is_weapon(mainhand)) {
                const tool = returnCorrectTool(mainhand);
                pl.setDynamicProperty('attackCool', tool.cool);
                pInv.setMainhand(new ItemUtil(mainhand).setLockMode(ItemLockMode.slot))
            }
            
        }
        
    })
})

world.afterEvents.entityHurt.subscribe((e)=>{
    const damagingEntity = e.damageSource.damagingEntity;
    if(damagingEntity?.typeId !== MinecraftEntityTypes.player.id||e.damageSource.cause!==EntityDamageCause.entityAttack) return;

    const pInv = new PInvUtil(damagingEntity as Player);
    const itemStack = pInv.getMainhand();
    const attackCool = damagingEntity?.getDynamicProperty('attackCool') as number;

    if(is_weapon(itemStack)) {
        const tool = returnCorrectTool(itemStack);
        damagingEntity.setDynamicProperty('attackCool',tool.cool);
        if (attackCool === 0) {
            pInv.setMainhand(new ItemUtil(itemStack).setLockMode(ItemLockMode.slot))
            tool.AfterHit(e);
            
        }
        else {
            const health = e.hurtEntity.getComponent(EntityHealthComponent.componentId) as EntityHealthComponent;
            health.setCurrentValue(health.currentValue + e.damage)
        }
    }
})

function returnCorrectTool(itemStack: ItemStack): tool {
    if(itemStack.hasTag("is_sword")) return new sword(itemStack);
    if(itemStack.hasTag("is_shovel")) return new shovel(itemStack);
    if(itemStack.hasTag("is_axe")) return new axe(itemStack);
};

function is_weapon(itemStack: ItemStack): boolean {
    if(!itemStack) return false
    if(itemStack.hasTag("is_tool")&&!itemStack.hasTag("is_pickaxe")) return true;
    else return false;
}

function setLockMode(player: Player, index: number, lockMode: ItemLockMode) {
    const pInv = new PInvUtil(player);
    const itemStack = pInv.getItem(index);
    const lockItem = new ItemUtil(itemStack).setLockMode(lockMode);
    pInv.setItem(index, lockItem);
}


interface tool {
    cool: number;
    itemStack: ItemStack;
    damageRatio: number;
    AfterHit(ev: EntityHurtAfterEvent): void
}

class sword implements tool {
    cool: number;
    itemStack: ItemStack;
    damageRatio: number;
    constructor(itemStack: ItemStack) {
        this.itemStack = itemStack;
        this.cool = 10;
        this.damageRatio = 1;
    }

    public AfterHit(ev: EntityHurtAfterEvent): void {

    }
}

class shovel implements tool {
    cool: number;
    itemStack: ItemStack;
    damageRatio: number;
    constructor(itemStack: ItemStack) {
        this.itemStack = itemStack;
        this.cool = 5;
        this.damageRatio = 1;
    }

    public AfterHit(ev: EntityHurtAfterEvent): void {

    }
}

class axe implements tool {
    cool: number;
    itemStack: ItemStack;
    damageRatio: number;
    constructor(itemStack: ItemStack) {
        this.itemStack = itemStack;
        this.cool = 25;
        this.damageRatio = 2;
    }

    public AfterHit(ev: EntityHurtAfterEvent): void {
        const knockback = ev.damageSource.damagingEntity.getViewDirection()
        ev.hurtEntity.applyKnockback(knockback.x,knockback.z,1,0.7);
        ev.hurtEntity.applyDamage(Math.round((ev.damage-1)*this.damageRatio), {"cause":EntityDamageCause.entityAttack, "damagingEntity": ev.damageSource.damagingEntity})
        
    }
}