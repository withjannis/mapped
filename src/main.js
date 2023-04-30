async function queryUserId(username) {
    const userProperties = await fetch(
        `https://www.instagram.com/web/search/topsearch/?query=${username}`
    );
    const userPropertiesJson = await userProperties.json();
    //console.log("test") 
    //console.log(userPropertiesJson.users[0].user.pk_id)
    return Promise.resolve(userPropertiesJson.users[0].user.pk_id);
};

async function queryRelated(userId, relation) {
    switch(relation){
        case "followers":
            url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=`
            edgeProperty = "edge_followed_by"
            break;
        case "following":
            url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=`
            edgeProperty = "edge_follow"
            break;
    };
   var RelatedList = [];
    hasNext = true;
    after = null;
    while(hasNext){
        const RelationProperties = await fetch(
            url +
              encodeURIComponent(
                JSON.stringify({
                  id: userId,
                  include_reel: true,
                  fetch_mutual: true,
                  first: 50,
                  after: after,
                })
              )
        );
        const RelationPropertiesJson = await RelationProperties.json();
        hasNext = RelationPropertiesJson.data.user[edgeProperty].page_info.has_next_page;
        after = RelationPropertiesJson.data.user[edgeProperty].page_info.end_cursor;

        //console.log(followersPropertiesJson.data.user.edge_followed_by.edges)
        for (var i = 0; i < RelationPropertiesJson.data.user[edgeProperty].edges.length; i++) {
            RelatedList.push(
                {
                    "id": RelationPropertiesJson.data.user[edgeProperty].edges[i].node.id,
                    "username": RelationPropertiesJson.data.user[edgeProperty].edges[i].node.username,
                    "fullName": RelationPropertiesJson.data.user[edgeProperty].edges[i].node.full_name,
                    "profilePicUrl": RelationPropertiesJson.data.user[edgeProperty].edges[i].node.profile_pic_url,
                }
            )
        }
    };
    return RelatedList;
    //console.log(followersList)
};
sterializeRelatedList = function(relatedList){
    var serializedList = [];
    relatedList.forEach(element => {
        serializedList.push(element.username);
    });
    return serializedList;
};

findIDontFollowThemBack = async function(followerList, followingList){
    followerList = sterializeRelatedList(followerList);
    followingList = sterializeRelatedList(followingList);
    //i do not follow them back
    //in follower list, but not in following list
    const iDontFollowThemBack= followerList.filter(el => !followingList.includes(el));
    return iDontFollowThemBack;
};

findTheyDontFollowMeBack = async function(followerList, followingList){
    followerList = sterializeRelatedList(followerList);
    followingList = sterializeRelatedList(followingList);
    //they are not following me back
    //in following list, but not in follower list
    const theyDontFollowMeBack = followingList.filter(el => !followerList.includes(el));
    return theyDontFollowMeBack;
};
fullData = {};
const username = "withjannis";
// to find the userId of a user
const userId = await queryUserId(username)
console.log(`username for ${username} is: ${userId}`)
// to find the followers of a user
const followers = await queryRelated(userId, "followers")
const following = await queryRelated(userId, "following")
fullData["username"] = username;
fullData["userId"] = userId;
fullData["related"] = {};
fullData["related"]["followers"] = followers;
fullData["related"]["following"] = following;
fullData["relation"] = {};
fullData["relation"]["iDontFollowThemBack"] = await findIDontFollowThemBack(followers, following);
fullData["relation"]["theyDontFollowMeBack"] = await findTheyDontFollowMeBack(followers, following);
console.log(`informations for ${username} are:`)
console.log(fullData)
console.log(`to get the data write copy(fullData)`)