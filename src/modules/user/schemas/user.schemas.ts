import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'user',
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  // @ApiProperty()
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, namespace: 'auth0_id' })
  auth0Id: string;

  @Exclude()
  @Prop({
    required: false,
    namespace: 'webauthn',
    type: MongooseSchema.Types.Mixed,
  })
  webauthn: object;

  @Prop({ required: true, default: false, namespace: 'is_deleted' })
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
