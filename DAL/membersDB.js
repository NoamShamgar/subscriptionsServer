const Member = require("../models/member");

const getAllMembers_DAL = async () => {
    return await Member.find({});
}

const getMember_DAL = async (id) => {
    return await Member.findById(id);
}

const addMember_DAL = async (obj) => {
    let newMember = new Member(obj);
    return await newMember.save();
}

const updateMember_DAL = async (id,obj) => {
    return await Member.findByIdAndUpdate(id,obj);
}

const deleteMember_DAL = async (id) => {
    return await Member.findByIdAndRemove(id);
}

module.exports = {  
                    getAllMembers_DAL,
                    getMember_DAL,
                    addMember_DAL,
                    updateMember_DAL,
                    deleteMember_DAL
                 }