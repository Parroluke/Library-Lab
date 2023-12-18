import { Entity, EntityDamageCause, EntityScaleComponent, ItemStack, MinecraftDimensionTypes, Player, Vector, Vector3, system, world } from "@minecraft/server";



world.sendMessage('started')
import "./antHell/run.js"
import { worldDB } from "../library/build/databaseBuilder.js";

//나침반 이동
world.afterEvents.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.itemStack;    

    if(item.typeId == 'minecraft:compass') source.teleport(e.source.getBlockFromViewDirection().block.location, {"dimension":e.source.dimension, "rotation":{"x":source.getRotation().x,"y":e.source.getRotation().y}})
});

world.sendMessage("test")
world.sendMessage(new Date().toUTCString())
// const cropDB = new worldDB<Vector3>("crop");
// const crops: Vector3[] = [];
// system.runInterval(()=>{
   
//     world.getDimension(MinecraftDimensionTypes.overworld).getEntities({"families":["monster"]}).forEach((en)=>{
//         if(en.target) return;
//         const targetCrop = cropDB.values().find((v)=>Vector.distance(en.location, v) < 20);
//         if(!targetCrop) return;
//         if(world.getDimension('overworld').getEntities({tags:["cropEn"],location:targetCrop,maxDistance:1})) return;
//         world.sendMessage('ja')
//         const cropEn = world.getDimension(("overworld")).spawnEntity("minecraft:armor_stand", targetCrop);
//         cropEn.addTag("cropEn");
//         cropEn.addEffect("health_boost", 99999, {"amplifier": 255, "showParticles": false});
//         cropEn.addEffect("instant_health", 1, {"amplifier": 255, "showParticles": false});
//         //cropEn.addEffect("invisibility", 99999, {"amplifier": 255, "showParticles": false});
//         en.applyDamage(1, {"damagingEntity":cropEn, "cause":EntityDamageCause.entityAttack})
//     })

//     world.getDimension(MinecraftDimensionTypes.overworld).getEntities({"tags":["cropEn"]}).forEach((en)=>{
//         const ceiledLoc = {x:Math.round(en.location.x),y:Math.round(en.location.y),z:Math.round(en.location.z)};
        
//         en.teleport(ceiledLoc)
//         const destroyMonster = world.getDimension("overworld").getEntities({"minDistance":0,"maxDistance":1,"location":en.location,"families":["monster"]});
//         if(destroyMonster[0]) {
//             en.remove();
//             const cropLoc = vectorToVector3(Vector.add(Vector.up, ceiledLoc))
//             world.getDimension("overworld").fillBlocks(cropLoc,cropLoc,"air")
//             cropDB.delete(JSON.stringify(cropLoc))
//         }
//     })
// })

// world.afterEvents.chatSend.subscribe((ev)=>{
//     if(ev.message == "cropdata") ev.sender.sendMessage(cropDB.toString())
// })

// world.beforeEvents.itemUseOn.subscribe((ev)=>{
//     if(ev.block.typeId!=="minecraft:farmland") return;
//     const cropLoc = vectorToVector3(Vector.add(Vector.up, ev.block.location))
    
//     if(ev.itemStack.typeId == "minecraft:wheat_seeds") cropDB.set(JSON.stringify(cropLoc), ev.block.location)
// })

// function vectorToVector3(v: Vector): Vector3 {
//     return {"x": v.x, "y": v.y, "z": v.z}
// }
