import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../base/Entity/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'banks' })
export class BankEntity extends BaseEntity {
  @Field()
  @Column({ unique: true })
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;
}
