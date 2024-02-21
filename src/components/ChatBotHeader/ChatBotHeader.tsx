import { MouseEvent } from "react";

import { useBotOptions } from "../../context/BotOptionsContext";

import "./ChatBotHeader.css";

/**
 * Contains bot avatar, name, notifications, audio and close chat icon.
 * 
 * @param notificationToggledOn boolean indicating if notification is toggled on
 * @param audioToggledOn boolean indicating if audio is toggled on
 * @param handleToggleNotification handles toggling of notification
 * @param handleToggleAudio handles toggling of audio
 */
const ChatBotHeader = ({
	notificationToggledOn,
	audioToggledOn,
	handleToggleNotification,
	handleToggleAudio
}: {
	notificationToggledOn: boolean;
	audioToggledOn: boolean;
	handleToggleNotification: () => void;
	handleToggleAudio: () => void;
}) => {

	// handles options for bot
	const { botOptions, setBotOptions } = useBotOptions();

	// styles for header
	const headerStyle = {
		background: `linear-gradient(to right, ${botOptions.theme?.secondaryColor },
			${botOptions.theme?.primaryColor})`,
		...botOptions.headerStyle
	}

	// icons in header
	const headerImages = {
		headerAvatar: {
			backgroundImage: `url(${botOptions.header?.avatar})`,
		},
		notificationIcon: {
			backgroundImage: `url(${botOptions.notification?.icon})`,
		},
		audioIcon: {
			backgroundImage: `url(${botOptions.audio?.icon})`,
		},
		closeChatIcon: {
			backgroundImage: `url(${botOptions.header?.closeChatIcon})`,
		}
	};

	/**
	 * Handles closing of chat window.
	 */
	const handleCloseChat = () => {
		setBotOptions({...botOptions, isOpen: false});
	}

	return (
		<div style={headerStyle} className="rcb-chat-header-container">
			<div className="rcb-chat-header">
				{botOptions.header?.showAvatar &&
					<div style={headerImages.headerAvatar} className="rcb-bot-avatar"/>
				}
				{botOptions.header?.title}
			</div>
			<div className="rcb-chat-header">
				{!botOptions.theme?.embedded &&
					<div
						style={headerImages.closeChatIcon}
						onMouseDown={(event: MouseEvent) => {
							event.stopPropagation();
							handleCloseChat();
						}}
						className="rcb-close-chat-icon"
					>
					</div>
				}
			</div>
		</div>
	);
};

export default ChatBotHeader;