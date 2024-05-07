const request = require("supertest");
const app = require("../app");
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

describe("Comment Controller", () => {
    let postId;
    let commentId;

    beforeAll(async () => {
        // Create a post for testing
        const post = new Post({
            title: "Test Post",
            content: "This is a test post",
        });
        await post.save();
        postId = post._id;
    });

    afterAll(async () => {
        // Clean up created post and comments
        await Post.deleteMany({});
        await Comment.deleteMany({});
    });

    describe("createComment", () => {
        it("should create a new comment", async () => {
            const response = await request(app)
                .post(`/api/posts/${postId}/comments`)
                .send({ content: "Test comment" });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.content).toBe("Test comment");

            commentId = response.body._id;
        });
    });

    describe("getComments", () => {
        it("should get all comments", async () => {
            const response = await request(app).get("/api/comments");

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe("getCommentsByPost", () => {
        it("should get comments by post", async () => {
            const response = await request(app).get(`/api/posts/${postId}/comments`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe("updateComment", () => {
        it("should update a comment", async () => {
            const response = await request(app)
                .put(`/api/comments/${commentId}`)
                .send({ content: "Updated comment" });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.content).toBe("Updated comment");
        });
    });

    describe("deleteComment", () => {
        it("should delete a comment", async () => {
            const response = await request(app).delete(`/api/comments/${commentId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.content).toBe("Updated comment");
        });
    });

    describe("likeComment", () => {
        it("should like a comment", async () => {
            const response = await request(app).post(`/api/comments/${commentId}/like`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.likes).toContainEqual(expect.any(String));
        });
    });

    describe("unLikeComment", () => {
        it("should unlike a comment", async () => {
            const response = await request(app).post(`/api/comments/${commentId}/unlike`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("_id");
            expect(response.body.likes).not.toContainEqual(expect.any(String));
        });
    });
});
