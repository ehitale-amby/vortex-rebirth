let {smd} = require("../lib")

// Get Privacy Settings (Toxic Version)
smd({
	pattern: 'getprivacy',
	fromMe: true,
	desc: 'Get your privacy settings (not that anyone cares).',
	type: 'whatsapp settings'
}, async (message, match) => {
	const {
		readreceipts,
		profile,
		status,
		online,
		last,
		groupadd,
		calladd
	} = await message.bot.fetchPrivacySettings(true);
	const msg = `*♺ WhatsApp Privacy Settings* (Not that it’ll help your social life 🙄)

*ᝄ Name:* ${(message.fromMe &&  message.pushName ? message.pushName :  message.bot.user.name).split("\n").join("  ") }
*ᝄ Number:* ${message.user.split("@")[0]}

*ᝄ Online:* ${online}
*ᝄ Profile:* ${profile}
*ᝄ Last Seen:* ${last}
*ᝄ WhatsApp Status:* ${status}
*ᝄ Read Receipt:* ${readreceipts}

*ᝄ Who Can Add You to Groups:* ${groupadd}
*ᝄ Who Can Call You:* ${calladd}

No one? Yeah, sounds about right. 😂`;
	let img = await message.getpp(message.user)
	await message.send(img, {
		caption: msg
	}, 'img');
})

// Last Seen Privacy (Toxic Version)
smd({
	pattern: 'lastseen',
	fromMe: true,
	desc: 'Change last seen privacy (not that anyone’s checking on you).',
	type: 'whatsapp settings'
}, async (message, match, { smd }) => {
    try {
	if (!match) return await message.send(`_*Example:-* .lastseen all_\n_Change last seen privacy settings. Not that anyone’s looking for you._`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_Action must be *${available_privacy.join(' / ')}* values. Maybe just set it to *none*, no one cares._`);
	await message.bot.updateLastSeenPrivacy(match)
	await message.send(`_Privacy settings *last seen* updated to *${match}*. Now continue being invisible._`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : lastseen`, e, false);
    }
})

// Online Privacy (Toxic Version)
smd({
	pattern: 'online',
	fromMe: true,
	desc: 'Change online privacy (why bother, though?).',
	type: 'whatsapp settings'
}, async (message, match) => {
    try {
	if (!match) return await message.send(`_*Example:-* .online all_\n_Change *online* privacy settings. But let’s be real, no one’s checking._`);
	const available_privacy = ['all', 'match_last_seen'];
	if (!available_privacy.includes(match)) return await message.send(`_Action must be *${available_privacy.join('/')}* values. Just pick one and move on._`);
	await message.bot.updateOnlinePrivacy(match)
	await message.send(`_Privacy updated to *${match}*. Now go touch some grass._`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : online`, e, false);
    }
})


// Profile Picture Privacy (Toxic Version 😈)
smd({
	pattern: 'mypp',
	fromMe: true,
	desc: 'Privacy setting for profile picture 📸',
	type: 'whatsapp settings'
}, async (message, match) => {
    try {
	if (!match) return await message.send(`_*Example:-* .mypp all_\n🛑 _To change *profile picture* privacy settings._\n\nNot that anyone wants to see your ugly DP anyway. 🙄`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`⚠️ _Action must be *${available_privacy.join('/')}* values._\n\nJust set it to *none*—do the world a favor. 🤡`);
	await message.bot.updateProfilePicturePrivacy(match)
	await message.send(`✅ _Profile Picture Privacy Updated to *${match}*._\n\nStill won't make you look any better. 😂`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : mypp`, e, false);
    }
})

// Status Privacy (Toxic Version 🧐)
smd({
	pattern: 'mystatus',
	fromMe: true,
	desc: 'Privacy setting for status 📢',
	type: 'whatsapp settings'
}, async (message, match) => {
    try {
	if (!match) return await message.send(`_*Example:-* .mystatus all_\n📢 _To change *status* privacy settings._\n\nNobody reads your cringe status updates anyway. 😴`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`⚠️ _Action must be *${available_privacy.join('/')}* values._\n\nJust pick *none*, nobody cares about your "deep quotes." 🤡`);
	await message.bot.updateStatusPrivacy(match)
	await message.send(`✅ _Status Privacy Updated to *${match}*._\n\nStill won't get you any views. 😂`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : mystatus`, e, false);
    }
})

// Read Receipts Privacy (Toxic Version 🤨)
smd({
	pattern: 'read',
	fromMe: true,
	desc: 'Privacy setting for read messages 👀',
	type: 'whatsapp settings'
}, async (message, match) => {
    try {
	if (!match) return await message.send(`_*Example:-* .read all_\n👀 _To change *read receipts* privacy settings._\n\nLike you even read messages in the first place. 🙄`);
	const available_privacy = ['all', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`⚠️ _Action must be *${available_privacy.join('/')}* values._\n\nSet it to *none*, keep ghosting people like a pro. 👻`);
	await message.bot.updateReadReceiptsPrivacy(match)
	await message.send(`✅ _Read Receipts Privacy Updated to *${match}*._\n\nNow you can ignore people in peace. 😏`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : read`, e, false);
    }
})

// Group Add Privacy (Toxic Version 🤡)
smd({
	pattern: 'groupadd',
	fromMe: true,
	desc: 'Privacy setting for being added to groups 🚪',
	type: 'whatsapp settings'
}, async (message, match) => {
    try {
	if (!match) return await message.send(`_*Example:-* .groupadd all_\n🚪 _To change *group add* privacy settings._\n\nLet's be honest, no one is inviting you anywhere. 😂`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`⚠️ _Action must be *${available_privacy.join('/')}* values._\n\nMight as well pick *none*, who’s even adding you? 🤡`);
	await message.bot.updateGroupsAddPrivacy(match)
	await message.send(`✅ _Group Add Privacy Updated to *${match}*._\n\nNot that anyone was trying to add you anyway. 🤣`);
    } catch (e) { 
        message.error(`${e}\n\nCommand : groupadd`, e, false);
    }
})