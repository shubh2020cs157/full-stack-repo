#!/usr/bin/env node

/**
 * Simple API Test Script
 * This script demonstrates the Forum CRUD API functionality
 * Run with: node test-api.js
 */

const baseUrl = "http://localhost:3007/api";

// Helper function to make HTTP requests
async function makeRequest(method, endpoint, data = null) {
  const url = `${baseUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(`\n${method} ${endpoint}`);
    console.log(`Status: ${response.status}`);
    console.log("Response:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error(
      `Error making ${method} request to ${endpoint}:`,
      error.message
    );
    return null;
  }
}

// Test functions
async function testHealthCheck() {
  console.log("🏥 Testing Health Check...");
  await makeRequest("GET", "/health");
}

async function testGetAllPosts() {
  console.log("\n📝 Testing Get All Posts...");
  await makeRequest("GET", "/posts");
}

async function testCreatePost() {
  console.log("\n➕ Testing Create Post...");
  const postData = {
    title: "Welcome to Our Forum!",
    content:
      "This is a test post created by the API test script. It demonstrates the forum CRUD functionality.",
    excerpt: "A welcome message for new forum members.",
    category_id: 1,
    tags: ["welcome", "announcement", "test"],
    status: "published",
    is_pinned: true,
  };

  return await makeRequest("POST", "/posts", postData);
}

async function testGetPostById(postId) {
  console.log("\n🔍 Testing Get Post by ID...");
  await makeRequest("GET", `/posts/${postId}`);
}

async function testUpdatePost(postId) {
  console.log("\n✏️ Testing Update Post...");
  const updateData = {
    title: "Updated: Welcome to Our Forum!",
    content:
      "This post has been updated to demonstrate the update functionality.",
    is_pinned: false,
  };

  return await makeRequest("PUT", `/posts/${postId}`, updateData);
}

async function testSearchPosts() {
  console.log("\n🔎 Testing Search Posts...");
  await makeRequest("GET", "/posts?search=welcome&limit=5");
}

async function testGetPostStats() {
  console.log("\n📊 Testing Get Post Statistics...");
  await makeRequest("GET", "/posts/stats");
}

async function testLikePost(postId) {
  console.log("\n❤️ Testing Like Post...");
  await makeRequest("POST", `/posts/${postId}/like`, { user_id: 1 });
}

async function testDeletePost(postId) {
  console.log("\n🗑️ Testing Delete Post...");
  await makeRequest("DELETE", `/posts/${postId}`);
}

// Main test function
async function runTests() {
  console.log("🚀 Starting Forum CRUD API Tests...");
  console.log("Make sure the server is running on http://localhost:3007");

  try {
    // Test health check
    await testHealthCheck();

    // Test get all posts
    await testGetAllPosts();

    // Test create post
    const createResult = await testCreatePost();
    const postId = createResult?.data?.id;

    if (postId) {
      // Test get post by ID
      await testGetPostById(postId);

      // Test update post
      await testUpdatePost(postId);

      // Test search posts
      await testSearchPosts();

      // Test like post
      await testLikePost(postId);

      // Test get post stats
      await testGetPostStats();

      // Test delete post
      await testDeletePost(postId);
    }

    console.log("\n✅ All tests completed!");
    console.log(
      "\n📚 For more information, visit: http://localhost:3007/api/docs"
    );
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === "undefined") {
  console.error("❌ This script requires Node.js 18+ or a fetch polyfill");
  console.log("💡 You can install node-fetch: npm install node-fetch");
  process.exit(1);
}

// Run the tests
runTests();
