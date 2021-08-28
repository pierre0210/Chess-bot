function getMentionUser(mention) {
    if (!mention) return;
	
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return mention;
	}
}

function tagUserByID(id) {
    let mention = '<@'+id+'>';
    return mention;
}

module.exports.getMentionUser = getMentionUser;
module.exports.tagUserByID = tagUserByID;