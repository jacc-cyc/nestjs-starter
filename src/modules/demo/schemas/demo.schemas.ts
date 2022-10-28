import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type DemoDocument = Demo & Document;

@Schema({
  collection: 'demo',
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Demo {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true, default: false, namespace: 'is_deleted' })
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export const DemoSchema = SchemaFactory.createForClass(Demo);
