import { Messages } from "./mongodb";

export const getAllMessages = async () => {
  const messages = await (await Messages()).find({}).sort({ _id: -1 }).toArray();
  return messages;
};

export const createMessage = async (newMessage) => {
  const result = await (await Messages()).insertOne(newMessage);

  return {
    _id: result.insertedId,
    ...newMessage
  };
};
