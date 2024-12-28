// utils/findUsernameByUserId.ts
import User from "@/models/user";

export async function findUsernameByUserId(userId: string): Promise<string | null> {
    try {
        const user = await User.findOne({ _id: userId });
        console.log("UserNameInFind: "+user.name);
        return user ? user.name : null;
    } catch (error) {
        console.error(`Error finding username for userId ${userId}:`, error);
        return null;
    }
}
