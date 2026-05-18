import mongoose from "mongoose";
import ApiError from "../../errors/ApiError";
import { FileUploadHelper } from "../image.upload";
import { deleteReferenceMap } from "./deleteReferenceMap";

export const safeDelete = async (
  model: any,
  id: string,
  imageKey?: string | string[],
) => {
  const modelName = model.collection.name;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const references = deleteReferenceMap[modelName] || [];

    for (const ref of references) {
      const exists = await ref.model.exists(
        { [ref.foreignKey]: id },
        { session },
      );

      if (exists) {
        throw new ApiError(
          400,
          `Cannot delete. This data is used in ${ref.model.collection.name}`,
        );
      }
    }

    await model.deleteOne({ _id: id }, { session });
    if (imageKey) {
      if (Array.isArray(imageKey)) {
        const validKeys = imageKey.filter(Boolean); // remove null/undefined

        for (const key of validKeys) {
          await FileUploadHelper.deleteFromSpaces(key);
        }
      } else {
        await FileUploadHelper.deleteFromSpaces(imageKey);
      }
    }

    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Deleted successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
