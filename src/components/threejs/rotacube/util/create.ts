import { Mesh, BoxGeometry, Group, Object3D, MeshNormalMaterial } from 'three';

export const createBlockMesh = (material: MeshNormalMaterial): Mesh => {
  return new Mesh(new BoxGeometry(30, 30, 30), material);
};

export const createReplicatedGroup = (object: Object3D, replications: number): Group => {
  const clonedGroup = new Group();

  for (let i = 0; i < replications; i += 1) {
    clonedGroup.add(object.clone());
  }

  return clonedGroup;
};
