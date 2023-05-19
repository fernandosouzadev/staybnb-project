import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import { MessageInput } from '@/app/components/Inputs/MessageInput'
import { HeaderChat } from '@/app/components/Message/HeaderChat'
import { InfoChat } from '@/app/components/Message/InfoChat'
import { MessagesList } from '@/app/components/Message/MessagesList'
import { ChatModal } from '@/app/components/Modals/ChatModal'

interface IParams {
  conversationId: string
}

export default async function ConversatioPage({ params }: { params: IParams }) {
  const initialMessages = await getMessages(params.conversationId)
  const conversation = await getConversationById(params.conversationId)
  const isEmpty = !conversation

  return (
    <>
      <ChatModal initialMessages={initialMessages} name={conversation?.name} />
      <div
        className="hidden md:block border-x border-t border-rose-50 focus:border-black"
        tabIndex={2}
      >
        <div className="border-b border-rose-50 flex flex-row justify-between items-center min-h-[80px] px-5">
          {!isEmpty && <HeaderChat conversation={conversation} />}
        </div>
        <div
          className="flex flex-col justify-between items-center "
          style={{ height: 'calc(100vh - 170px)' }}
        >
          <div className="w-full flex flex-col justify-between items-center overflow-y-auto">
            <MessagesList initialMessages={initialMessages} />
          </div>
          {conversation && (
            <div className="w-[60%]">
              <MessageInput conversationId={params?.conversationId as string} />
            </div>
          )}
        </div>
      </div>
      <InfoChat listing={conversation?.listing} />
    </>
  )
}
