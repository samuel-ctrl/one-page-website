import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';

const ChatComponent = ({ client, channel, ...rest }) => {
    return (
        <Chat client={client}>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </Chat>
    );
}

export default ChatComponent;