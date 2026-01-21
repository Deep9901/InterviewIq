import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
// You need to uncomment the line below so the stream functions work
// import { deleteStreamUser, upsertStreamUser } from "./stream.js";

// Initialize the Inngest client to handle background events
export const inngest = new Inngest({ id: "interview-iq" });

// Define a function to sync data when a user is created
const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" }, // Trigger: Runs automatically when a user is created in Clerk
    async ({ event }) => {
        await connectDB(); // Ensure the database connection is open

        // Get the relevant user details from the webhook event
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        // Create a user object formatted for your database
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url,
        };

        // Save the new user to MongoDB
        await User.create(newUser);

        // Add or update the user in the Stream service
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage,
        });
    }
);

// Define a function to clean up data when a user is deleted
const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" }, // Trigger: Runs when a user is deleted in Clerk
    async ({ event }) => {
        await connectDB();

        const { id } = event.data;
        
        // Find the user by their Clerk ID and delete them from MongoDB
        await User.deleteOne({ clerkId: id });

        // Remove the user from the Stream service as well
        await deleteStreamUser(id.toString());   
    }
);

// Export the functions so Inngest can serve them
export const functions = [syncUser, deleteUserFromDB];