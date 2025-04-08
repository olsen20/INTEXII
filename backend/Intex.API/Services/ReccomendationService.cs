using Microsoft.ML.OnnxRuntime;
using Microsoft.ML.OnnxRuntime.Tensors;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Intex.API.Services
{
    public class RecommendationService
    {
        private readonly InferenceSession _session;

        public RecommendationService()
        {
            var modelPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "knn_model.onnx");
            _session = new InferenceSession(modelPath);
        }

        public List<Recommendation> GetRecommendationsForShow(string showId)
        {
            // Retrieve the feature vector for the showId
            var inputFeatures = GetFeatureVectorForShow(showId);

            if (inputFeatures == null || inputFeatures.Length == 0)
                return null;

            // Create the input tensor for the model
            var inputTensor = new DenseTensor<float>(inputFeatures, new[] { 1, inputFeatures.Length });

            // Input name must match what you set during ONNX conversion ("float_input")
            var inputs = new List<NamedOnnxValue>
            {
                NamedOnnxValue.CreateFromTensor("float_input", inputTensor)
            };

            // Run inference
            using var results = _session.Run(inputs);

            // Get output (the 5 most similar items)
            var output = results.First().AsEnumerable<float>().ToArray();

            // Clean the output by replacing extreme values with NaN or handling them
            output = CleanRecommendations(output);

            // Return recommendations
            return MapRecommendations(output);
        }

        private float[] GetFeatureVectorForShow(string showId)
        {
            // Replace this with logic to fetch the feature vector for the given showId
            // For example, you could look up a dictionary, fetch data from a database, or load a file that maps showIds to vectors.

            // Example placeholder: return a dummy 200-dimensional vector.
            // NOTE: You need to replace this with actual logic that returns the feature vector used during training.
            return new float[200];  // Example: 200-dimensional vector
        }

        private float[] CleanRecommendations(float[] output)
        {
            // Clean the recommendation output by replacing infinity or NaN values with a default value
            for (int i = 0; i < output.Length; i++)
            {
                if (float.IsInfinity(output[i]) || float.IsNaN(output[i]))
                {
                    output[i] = 0f;  // Replace with a default value, such as 0, or handle it as needed
                }
            }
            return output;
        }

        private List<Recommendation> MapRecommendations(float[] output)
        {
            // Assuming the output is an array of recommendation indices or scores.
            return output.Take(5).Select((score, index) => new Recommendation
            {
                ShowId = $"s{index + 1000}", // Example, map index back to showId
                SimilarityScore = score
            }).ToList();
        }
    }

    public class Recommendation
    {
        public string ShowId { get; set; }
        public float SimilarityScore { get; set; }
    }
}
