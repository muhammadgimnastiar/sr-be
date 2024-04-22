import supertest from "supertest";
import server from "../../lib/testServer";
import { token } from "../db";

const app = server();

describe("Event Controller", () => {
  describe("Create Event", () => {
    it("should create a new event", async () => {
      const user = {
        id: "2bc486a6-dc5a-4608-a3ad-84575e0da497",
      };

      const newEvent = {
        title: "Test Event",
        description: "This is a test event.",
        path_image: "/images/test-event.jpg",
        user_id: user.id,
      };

      const response = await supertest(app).post("/api/events").set("Authorization", `${token}`).send(newEvent).expect(201);

      expect(response.body.status).toBe(201);
    });
  });

  describe("Update Event", () => {
    it("should update an existing event", async () => {
      const eventId = "2";

      const updatedEvent = {
        title: "Updated Test Event",
        description: "This is an updated test event.",
        path_image: "/images/updated-test-event.jpg",
        user_id: "2bc486a6-dc5a-4608-a3ad-84575e0da497",
      };

      const response = await supertest(app).put(`/api/events/${eventId}`).set("Authorization", `${token}`).send(updatedEvent).expect(200);

      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Event updated successfully");
    });

    it("should return 404 for non-existing event", async () => {
      const nonExistingEventId = "100";

      const updatedEvent = {
        title: "Updated Test Event",
        description: "This is an updated test event.",
        path_image: "/images/updated-test-event.jpg",
        user_id: "123456",
      };

      const response = await supertest(app).put(`/api/events/${nonExistingEventId}`).set("Authorization", `${token}`).send(updatedEvent).expect(404);

      expect(response.body.status).toBe(404);
      expect(response.body.message).toBe("Event not found");
    });
  });
});
