import { MinecraftDimensionTypes, system, world } from "@minecraft/server";
import { clearALLDB, worldDB } from "../library/build/databaseBuilder";
world.sendMessage('started');
//나침반 이동
world.afterEvents.itemUse.subscribe((e) => {
    const source = e.source;
    const item = e.itemStack;
    if (item.typeId == 'minecraft:compass')
        source.teleport(e.source.getBlockFromViewDirection().block.location, { "dimension": e.source.dimension, "rotation": { "x": source.getRotation().x, "y": e.source.getRotation().y } });
});
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
