import { observer } from 'mobx-react-lite';
import { ws } from '../utils/WS';
import { ChatVM } from '../viewModels/Chat.VM';
import { useEffect, useMemo } from 'react';

interface ChatProps {
    currentUser: string;
    opponent: string;
}

const Chat: React.FC<ChatProps> = observer(({ currentUser, opponent }) => {
    const vm = useMemo(
        () => new ChatVM(currentUser, opponent, ws),
        [currentUser, opponent]
    );
    useEffect(() => {
        if (currentUser && opponent) {
            vm.listenToMessages();
        }
    }, [currentUser, opponent]);

    return (
        <div className='grid grid-rows-[1fr_60px] bg-white p-4'>
            <ul className='list-none flex flex-col justify-end gap-3 pb-4 overflow-auto'>
                {vm.messages.map((message, i) => (
                    <li
                        key={`message-${i}`}
                        className={`rounded shadow-md p-3 break-words ${
                            message.sender === vm.currentUser
                                ? ' bg-indigo-400 ml-3'
                                : 'bg-blue-400 mr-3'
                        }`}
                    >
                        {message.body}
                    </li>
                ))}
            </ul>
            <form
                className='self-center flex flex-row justify-between'
                onSubmit={(e) => {
                    vm.send(e);
                }}
            >
                <input
                    type={'text'}
                    name='chat'
                    placeholder='Start writting...'
                    className='text-black p-3 outline-none focus:outline-none'
                />
                <button type='submit' className='text-indigo-600'>
                    Send
                </button>
            </form>
        </div>
    );
});

export default Chat;
