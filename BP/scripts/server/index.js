<<<<<<< HEAD
import { MinecraftDimensionTypes, system, world } from "@minecraft/server";
import { clearALLDB, worldDB } from "../library/build/databaseBuilder";
world.sendMessage('started');
=======
import { world } from "@minecraft/server";
world.sendMessage('started');
import "./antHell/run.js";
>>>>>>> 2767d2a (Update)
//나침반 이동
world.afterEvents.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.itemStack;
    if (item.typeId == 'minecraft:compass')
        source.teleport(e.source.getBlockFromViewDirection().block.location, { "dimension": e.source.dimension, "rotation": { "x": source.getRotation().x, "y": e.source.getRotation().y } });
});
<<<<<<< HEAD
clearALLDB();
const spawnTickDB = new worldDB("spawnTick");
system.runInterval(() => {
    getEntitiesWithTypes(["minecraft:pig", "minecraft:sheep", "minecraft:chicken", "minecraft:cow"]).forEach((en) => {
        const spawnTick = spawnTickDB.get(en);
        if (!spawnTick)
            spawnTickDB.set(en, system.currentTick);
        else {
            const livedTick = system.currentTick - spawnTick;
            en.nameTag = `${livedTick}`;
            if (livedTick > 1200)
                en.kill();
            else if (livedTick == 600) {
                en.triggerEvent("minecraft:ageable_grow_up");
                en.removeEffect("health_boost");
            }
            else if (livedTick == 1) {
                en.addEffect("health_boost", 99999, { "amplifier": 255, "showParticles": false });
                en.addEffect("instant_health", 1, { "amplifier": 255, "showParticles": false });
                en.triggerEvent("minecraft:entity_born");
            }
        }
    });
});
function getEntitiesWithTypes(types) {
    let allEntities = [];
    for (let i = 0; i < types.length; i++) {
        const entities = world.getDimension(MinecraftDimensionTypes.overworld).getEntities({ "type": types[i] });
        allEntities = allEntities.concat(entities);
    }
    return allEntities;
}
=======
world.sendMessage(new Date().toUTCString());
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
>>>>>>> 2767d2a (Update)
