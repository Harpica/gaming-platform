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
        <div className='grid grid-rows-[minmax(250px,1fr)_60px] items-end bg-white overflow-hidden'>
            <ul className='list-none flex flex-col gap-3 pb-4 overflow-auto h-fit max-h-[250px] md:max-h-full md:h-fit p-4'>
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
                className='self-center flex flex-row justify-between p-4'
                onSubmit={(e) => {
                    vm.send(e);
                }}
            >
                <input
                    type={'text'}
                    name='chat'
                    disabled={vm.opponent === ''}
                    placeholder={`${
                        vm.opponent !== ''
                            ? 'Start writting...'
                            : 'Waiting for another player... '
                    }`}
                    className='text-black p-3 min-w-[250px] outline-none focus:outline-none'
                />
                <button
                    type='submit'
                    disabled={vm.opponent === ''}
                    className='text-indigo-600 enabled:hover:opacity-60'
                >
                    Send
                </button>
            </form>
        </div>
    );
});

export default Chat;
