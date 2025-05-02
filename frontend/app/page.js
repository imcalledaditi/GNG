"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var hero_1 = require("@/components/hero");
var about_us_1 = require("@/components/about-us");
var course_categories_1 = require("@/components/course-categories");
var chatbot_section_1 = require("@/components/chatbot-section");
var fitness_nutrition_courses_1 = require("@/components/fitness-nutrition-courses");
var blog_section_1 = require("@/components/blog-section");
function Home() {
    return (<div className="min-h-screen">
      <hero_1.default />
      <course_categories_1.default />
      <about_us_1.default />
      <fitness_nutrition_courses_1.default />
      <chatbot_section_1.default />
      <blog_section_1.default />
    </div>);
}
