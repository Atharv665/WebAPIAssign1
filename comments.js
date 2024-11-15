// destination.js
import chalk from "chalk";
import DestinationModule from "./destination.js";
import UserModule from "./user.js";
import Sentiment from "sentiment";

const CommentModule = {
  comments: [
    {
      commentId: 1,
      username: "ValerieChan665",
      destinationId: 1,
      commentText:
        "The stupid tour guide drove the car into a lampost! What the hell is going on in this company?",
      destinationName: "Caves of Zion",
    },
    {
      commentId: 2,
      username: "JoshisSUS54",
      destinationId: 1,
      commentText:
        "The guide was hostile, the staff were clueless, and the attraction was in shambles.",
      destinationName: "Caves of Zion",
    },
    {
      commentId: 3,
      username: "Crabbywolf90",
      destinationId: 3,
      commentText:
        "My tour guide graduated from how to be a absolute moron university.Bro has the IQ of a stone. bloody idiot.",
      destinationName: "Banded Sickle",
    },
    {
      commentId: 4,
      username: "TravelLover",
      destinationId: 3,
      commentText:
        "I hope an air strike is called on this disgusting place they call a attraction.Shit made me lose my sanity!!",
      destinationName: "Banded Sickle",
    },
    {
      commentId: 5,
      username: "MalcolmSinma",
      destinationId: 2,
      commentText: "Such a lovely place with incredible views!",
      destinationName: "Sky Gardens of Kyoto",
    },
    {
      commentId: 6,
      username: "wanderer",
      destinationId: 3,
      commentText:
        "Perfect spot for a peaceful retreat. The people are so kind.",
      destinationName: "Banded Sickle",
    },
    {
      commentId: 7,
      username: "GlobalNomad",
      destinationId: 1,
      commentText: "Amazing place, the sunrise was breathtaking!",
      destinationName: "Caves of Zion",
    },
    {
      commentId: 8,
      username: "PlasmaCarbine",
      destinationId: 2,
      commentText:
        "This was an absolutely incredible experience! The tour guide was knowledgeable, friendly, and had a great sense of humor.",
      destinationName: "Sky Gardens of Kyoto",
    },
  ],
  commentIdCounter: 9,

  //add a comment for a particular destination
  addComment(destinationId, commentText) {
    //check if destination exists before adding a comment.
    const res = DestinationModule.getDestinationById(destinationId);

    if (res === "Destination not found.") {
      return chalk.redBright("Destination does not exist.");
    } else {
      const comment = {
        commentId: this.commentIdCounter++,
        username: UserModule.getCurrentUser(),
        destinationId,
        commentText,
        destinationName: res.name,
      };
      this.comments.push(comment);
      return chalk.greenBright("Comment has been addded successfully.");
    }
  },

  //returns all comments
  getAllComments() {
    return this.comments;
  },

  //analyses the sentiment of all comments by using the sentiment library and returns the full array back with a new sentimentScore
  //key value pair for each comment.The spread operator is used to merge or add properties to an object or array.
  //A negative score indicated the comment is negative, while a positive one indicated it is a good one.
  sentimentAnalysis() {
    var sentiment = new Sentiment();
    // Iterate over the comments array and analyze each comment
    const results = this.comments.map((comment) => {
      const analysis = sentiment.analyze(comment.commentText);
      return {
        ...comment,
        sentimentScore: analysis.score,
      };
    });

    return results;
  },

  //carries out the sentiment anaylysis on all comments and sorts the comments based by lowest score to highest score
  sentimentAnalysisSort() {
    const results = this.sentimentAnalysis();

    const sortedComments = [results].sort((a, b) => {
      return a.score - b.score;
    });
    return sortedComments;
  },

  //Uses the reduce operator to accumulate the sentiment scores whether they are positive or negative.
  //The reduce method starts with an initial totals object: { positive: 0, negative: 0 }
  //If a sentimentScore is positive (> 0), it adds the score to totals.positive.
  //If a sentimentScore is negative (< 0), it adds the score to totals.negative.
  //A feedback code recommends a course of action based on whether the negative score is higher or the positive one.
  calculateAllScore() {
    const results = this.sentimentAnalysis();

    const scores = results.reduce(
      (totals, result) => {
        if (result.sentimentScore > 0) {
          totals.positive += result.sentimentScore;
        } else if (result.sentimentScore < 0) {
          totals.negative += Math.abs(result.sentimentScore);
        }
        return totals;
      },
      { positive: 0, negative: 0 }
    );

    //the Math.abs function allows a negative number to be converted to a positive one.
    const totalNegative = Math.abs(scores.negative);

    //feedback code to recommend course of action.
    if (totalNegative > scores.positive) {
      const negativesuggestion =
        "Feedback suggests improvement is needed. Please Address the issues raised by users or we will be losing investors.";

      return { ...scores, AnalysisResult: negativesuggestion };
    } else if (scores.positive > totalNegative) {
      const positivesuggestion =
        "Feedback suggests customers are loving the tours!.";

      return {
        ...scores,
        AnalysisResult: positivesuggestion,
      };
    } else {
      const mixedsuggestion =
        "Feedback is mixed. Consider focusing on the areas of improvement while maintaining the positive feedback.";

      return { ...scores, AnalysisResult: mixedsuggestion };
    }
  },
};

export default CommentModule;
