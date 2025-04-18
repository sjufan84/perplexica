import { 
  AzureChatOpenAI, AzureOpenAIEmbeddings 
} from '@langchain/openai';
import { ChatModel, EmbeddingModel } from '.';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { Embeddings } from '@langchain/core/embeddings';

const openaiChatModels: Record<string, string>[] = [
  {
    displayName: 'GPT-4 omni',
    key: 'gpt-4o',
  },
];

const openaiEmbeddingModels: Record<string, string>[] = [
  {
    displayName: 'Text Embedding 3 Large',
    key: 'text-embedding-3-large',
  },
];

export const loadOpenAIChatModels = async () => {
  try {
    const chatModels: Record<string, ChatModel> = {};

    openaiChatModels.forEach((model) => {
      chatModels[model.key] = {
        displayName: model.displayName,
        model: new AzureChatOpenAI({
          azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
          azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
          azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME || "gpt-4o-perplexica",
          azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION || "2025-01-01-preview",
        }) as unknown as BaseChatModel,
      };
    });

    return chatModels;
  } catch (err) {
    console.error(`Error loading OpenAI models: ${err}`);
    return {};
  }
};

export const loadOpenAIEmbeddingModels = async () => {
 
  try {
    const embeddingModels: Record<string, EmbeddingModel> = {};

    openaiEmbeddingModels.forEach((model) => {
      embeddingModels[model.key] = {
        displayName: model.displayName,
        model: new AzureOpenAIEmbeddings({
          azureOpenAIApiKey: process.env.AZURE_EMBEDDINGS_KEY,
          azureOpenAIApiInstanceName: process.env.AZURE_EMBEDDINGS_INSTANCE_NAME || "aiinstance2024",
          azureOpenAIApiDeploymentName: process.env.AZURE_EMBEDDINGS_DEPLOYMENT_NAME || "text-embedding-3-large",
          azureOpenAIApiVersion: process.env.AZURE_EMBEDDINGS_API_VERSION || "2024-02-01",
        }) as unknown as Embeddings,
      };
    });

    return embeddingModels;
  } catch (err) {
    console.error(`Error loading OpenAI embeddings models: ${err}`);
    return {};
  }
};
