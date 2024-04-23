const getPartnerInfo = (participants, username) => {
  return participants.find((participant) => participant.username !== username);
};

export default getPartnerInfo;
