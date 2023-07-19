import { world, MinecraftBlockTypes, MinecraftItemTypes, system, MinecraftEntityTypes, Player, Vector } from "@minecraft/server";
import { database } from "../library/build/databaseBuilder.js";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";

import { FormUI } from "../library/build/FormUIBuilder.js";

world.sendMessage('started')


//나침반 이동
world.events.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.item;    

    if(item.typeId == 'minecraft:compass') source.teleport(e.source.getBlockFromViewDirection().location, e.source.dimension,e.source.getRotation().x,e.source.getRotation().y)
    
})



//이단점프
database.addEntityV('land','number',MinecraftEntityTypes.player)
system.runInterval(()=>{
    world.getAllPlayers().forEach(pl=>{
        const {x,y,z} = pl.location
        const footloc = {
            x:x,
            y:y-0.1,
            z:z
        }
        
        const footbl = pl.dimension.getBlock(footloc);
        if(footbl.typeId!==MinecraftBlockTypes.air.id) pl.setDynamicProperty('land',1)
        if(footbl.typeId==MinecraftBlockTypes.air.id&&pl.isSneaking&&pl.getDynamicProperty('land')==1&&pl.getVelocity().y!==0) {
            pl.setDynamicProperty('land',0)
            pl.applyKnockback(pl.getViewDirection().x,pl.getViewDirection().z,2,0.5)
        }
    })
})



world.events.buttonPush.subscribe((e)=>{
    const source = e.source as Player;

    const form1 = new ActionFormData()
    .title('form1')
    .button('form1')
    .button("fu")

    const form2 = new ActionFormData()
    .title('form2')
    .button('form2')

    FormUI.addForm("ActionFormData", form1, (r)=>{
        if(r.selection==1) FormUI.show(form2, source)
    })

    FormUI.addForm("ActionFormData", form2, (r)=>{
        if(r.selection==0) FormUI.show(form1, source)
    })

    FormUI.show(form1,source)
})