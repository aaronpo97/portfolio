import { Mesh, BoxGeometry, MeshBasicMaterial, Texture, Group, Object3D } from 'three';

/**
 * Creates a Three.js mesh with a box geometry and a basic material using the provided
 * texture map.
 *
 * @param map - The texture map to apply to the mesh material.
 * @returns A Three.js mesh with the specified properties.
 */
export const createBlockMesh = (map: Texture): Mesh => {
  return new Mesh(new BoxGeometry(30, 30, 30), new MeshBasicMaterial({ map }));
};

/**
 * Creates a group of replicated objects based on the provided group and the number of
 * replications.
 *
 * @param object - The object to be replicated.
 * @param replications - The number of times to replicate the provided group.
 * @returns A new Three.js group containing the replicated objects.
 */
export const createReplicatedGroup = (object: Object3D, replications: number): Group => {
  const clonedGroup = new Group();

  for (let i = 0; i < replications; i += 1) {
    clonedGroup.add(object.clone());
  }

  return clonedGroup;
};
