import { strictObject, literal, record, array, optional, string, pipe, maxLength, unknown, minValue, integer, number, minLength, parse } from "./quiz-renderer-index-BXMeXr7c.js";
import { QUIZ_CONTRACT_VERSIONS } from "./quiz-renderer-mount-BXrM9heh.js";
import "./quiz-renderer.js";
import "./quiz-renderer-has-variant-choice-Bygb1hHs.js";
import "./quiz-renderer-quiz-renderer-messaging-C9QqZsWP.js";
const nonEmptyStringSchema = pipe(string(), minLength(1));
const recommendationResponseSchema = strictObject({
  contractVersion: literal(QUIZ_CONTRACT_VERSIONS.recommendations),
  responseId: nonEmptyStringSchema,
  recommendations: record(nonEmptyStringSchema, array(nonEmptyStringSchema)),
  responseToken: optional(string()),
  reserves: optional(
    record(nonEmptyStringSchema, pipe(array(nonEmptyStringSchema), maxLength(3)))
  ),
  quizVersionId: nonEmptyStringSchema,
  domain: nonEmptyStringSchema,
  storefrontAccessToken: optional(string()),
  // Admin Woo previews hydrate from the synced catalogue, never the shopper path.
  products: optional(record(string(), record(string(), unknown()))),
  revision: optional(pipe(number(), integer(), minValue(1)))
});
const parseRecommendationResponse = (value) => parse(recommendationResponseSchema, value);
export {
  parseRecommendationResponse
};
