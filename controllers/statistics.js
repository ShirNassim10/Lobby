const Form = require('../models/Form.js');
const LandingPage = require("../models/LandingPage.js");
const User = require("../models/user.js");
const Chat = require("../models/Chat.js");
const Quote = require('../models/quote.js')

getAllData = async (req, res) => {
  console.log("getAllData");
  let response = [];
  let currentUser = await User.findOne({ "uid": req.params.uId });
  let landingPages = await LandingPage.find({ user: currentUser._id });
  let viewers = [];
  let summary = 0;
  landingPages.forEach((landPage) => {
    console.log("----", landPage.viewers);
    if (landPage.viewers[0]) {
      summary += landPage.viewers.map(viewer => viewer.amount).reduce((prev, next) => prev + next, 0);
      console.log("length,", landPage.viewers[0]);
    }
    viewers.push({funnel:landPage._id,viewers:landPage.viewers})
  })

  response.push({ title: "Leads", viewers, summary })
  summary = 0;
  let forms = await Form.find({ user: currentUser._id });
  viewers = [];
  if (forms) {
    forms.forEach((form) => {
      console.log(form.viewers);
      summary += form.viewers.map(viewer => viewer.amount).reduce((prev, next) => prev + next, 0);
      viewers.push({form:form._id,viewers:form.viewers})
    })
    response.push({ title: "Forms", viewers, summary })
    console.log(response);

  }
  let liveChats = await Chat.find({ user: currentUser._id });
  viewers = [];
  summary = 0;
  if (liveChats) {
    liveChats.forEach((chat) => {
      console.log(chat.viewers);
      summary += chat.viewers.map(viewer => viewer.amount).reduce((prev, next) => prev + next, 0);
      viewers.push({chat:chat._id,viewers:chat.viewers})
    })
    response.push({ title: "Live chats", viewers, summary })
    console.log(response);

  }
  let groupQoutes = await Quote.aggregate([{  $match: { userId: currentUser._id } },{
    $group: {
      _id: { $dateToString: { format: "%d/%m/%Y", date: "$createdDate" } },
      amount: { $sum: 1 }
    }
  }])
  summary = 0;
  viewers=[]
  groupQoutes.forEach((qoutes) => {
    summary += qoutes.amount;
    viewers.push({...qoutes,date:qoutes._id})
  })
  response.push({ title: "Quotes", viewers, summary })
  console.log("groupQoutes", groupQoutes);
  res.send(response)

}
module.exports = {
  getAllData,
}