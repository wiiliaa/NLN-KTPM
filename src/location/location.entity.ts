import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree,
  JoinColumn,
} from 'typeorm';

@Tree('closure-table')
@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  level: LocationLevel;

  @Column()
  name: string;

  @Column({
    nullable: true,
    unsigned: true,
    name: 'parent_id',
  })
  parentId: number;

  @TreeParent()
  @JoinColumn({
    name: 'parent_id',
  })
  parent: Location;

  @TreeChildren()
  children: Location[];

  get isCity() {
    return this.level === LocationLevel.City;
  }

  get isDistrict() {
    return this.level === LocationLevel.District;
  }

  get isWard() {
    return this.level === LocationLevel.Ward;
  }
}

export enum LocationLevel {
  City = 1,
  District = 2,
  Ward = 3,
}
