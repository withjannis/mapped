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
    switch (relation) {
        case "followers":
            url = `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=`
            edgeProperty = "edge_followed_by"
            break;
        case "following":
            url = `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=`
            edgeProperty = "edge_follow"
            break;
    };
    var relatedList = [];
    hasNext = true;
    after = null;
    while (hasNext) {
        const relationProperties = await fetch(
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
        const relationPropertiesJson = await relationProperties.json();
        hasNext = relationPropertiesJson.data.user[edgeProperty].page_info.has_next_page;
        after = relationPropertiesJson.data.user[edgeProperty].page_info.end_cursor;

        //console.log(followersPropertiesJson.data.user.edge_followed_by.edges)
        relationPropertiesJson.data.user[edgeProperty].edges.forEach(element => {
            relatedList.push(
                {
                    "id": element.node.id,
                    "username": element.node.username,
                    "fullName": element.node.full_name,
                    "profilePicUrl": element.node.profile_pic_url,
                }
            )
        });
    };
    return relatedList;
    //console.log(followersList)
};
function sterializeRelatedList (relatedList) {
    var serializedList = [];
    relatedList.forEach(element => {
        serializedList.push(element.username);
    });
    return serializedList;
};

async function findIDontFollowThemBack (followerList, followingList) {
    followerList = sterializeRelatedList(followerList);
    followingList = sterializeRelatedList(followingList);
    //i do not follow them back
    //in follower list, but not in following list
    const iDontFollowThemBack = followerList.filter(el => !followingList.includes(el));
    return iDontFollowThemBack;
};

async function findTheyDontFollowMeBack (followerList, followingList) {
    followerList = sterializeRelatedList(followerList);
    followingList = sterializeRelatedList(followingList);
    //they are not following me back
    //in following list, but not in follower list
    const theyDontFollowMeBack = followingList.filter(el => !followerList.includes(el));
    return theyDontFollowMeBack;
};

async function findMutuals (followerList, followingList) {
    followerList = sterializeRelatedList(followerList);
    followingList = sterializeRelatedList(followingList);
    //i do not follow them back
    //in follower list, but not in following list
    const mutuals = followerList.filter(el => followingList.includes(el));
    return mutuals;
};

fullData = {};
//insert username here
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
fullData["relations"] = {};
fullData["relations"]["iDontFollowThemBack"] = await findIDontFollowThemBack(followers, following);
fullData["relations"]["theyDontFollowMeBack"] = await findTheyDontFollowMeBack(followers, following);
fullData["relations"]["mutuals"] = await findMutuals(followers, following);
console.log(`informations for ${username} are:`)
console.log(fullData)
console.log(`to get the data write copy(fullData)`)