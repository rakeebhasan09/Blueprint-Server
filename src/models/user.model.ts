import { model, Schema } from "mongoose";
import { TUser } from "../types/user.interface";
import bcrypt from "bcrypt";
import config from "../config";

const userSchema = new Schema<TUser>(
	{
		name: { type: String, require: true },
		email: { type: String, required: true, unique: true },
		role: {
			type: String,
			required: true,
			enum: ["user", "manager", "admin"],
		},
		password: { type: String, required: true, select: false },
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) {
		return next();
	}

	user.password = await bcrypt.hash(
		user.password as string,
		Number(config.bcrypt_salt_rounds),
	);

	next();
});

userSchema.post("save", function (user, next) {
	console.log(
		`[Post-Hook save], a new user is created with this email ${user.email}`,
	);
	user.password = "";
	next();
});

export const User = model<TUser>("users", userSchema);
