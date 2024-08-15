const tf = require("@tensorflow/tfjs-node");
const { model_storage } = require("../utils/paths.json");
const toBinary = require("../essentials/functions/toBinary.js");

module.exports = class Model {
  constructor(data) {
    this.model = null
    this.data = data.map(toBinary)
  }
  
  async loadModelJSON() {
    this.model = await tf.loadLayersModel(model_storage)
    return this.model
  }
  
  get setUpConfigModel() {
    this.model.add(tf.layers.dense({
      inputShape: [60],
      units: 128,
      activation: "relu"
    }))
    
    this.model.add(tf.layers.dense({
      units:64,
      activation: "relu"
    }))
    
    this.model.add(tf.layers.dense({
      units: 60,
      activation: "sigmoid"
    }))
  }
  
  compile() {
    this.model.compile({
      optimizer: "adam",
      loss: "binaryCrossentropy",
      metrics: ["accuracy"]
    })
  }
  
  setUpTrainingBasedOnDatabase() {
    this.xs = tf.tensor2d(this.data.slice(0, this.data.length - 1))
    this.ys = tf.tensor2d(this.data.slice(1))
  }
  
  async trainModel() {
    await this.model.fit(this.xs, this.ys, {
      epochs: 300,
      batchSize: 32
    })
    await this.model.save(model_storage)
  }
}