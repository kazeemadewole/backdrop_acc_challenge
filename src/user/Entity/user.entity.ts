import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../base/Entity/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Field()
  @Column({ unique: true })
  account_number: string;

  @Field()
  @Column()
  account_name: string;

  @Field()
  @Column({ default: false, nullable: true })
  is_verified: boolean;
}
