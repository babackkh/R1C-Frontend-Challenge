/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * RealWorld Conduit API
 * Conduit API documentation
 * OpenAPI spec version: 1.0.0
 */
import type { Profile } from "./profile";

export interface Comment {
	id: number;
	createdAt: string;
	updatedAt: string;
	body: string;
	author: Profile;
}
