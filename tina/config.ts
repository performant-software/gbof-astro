import { defineConfig } from "tinacms";
import TinaPlacePicker from "../src/components/TinePlacePicker";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            name: "cardImage",
            label: "Card Image",
            type: "image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "place",
                label: "Place",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "string",
                    required: true,
                    isTitle: true,
                  },
                  {
                    name: "place",
                    label: "Place Data",
                    type: "object",
                    fields: [
                      {
                        name: "title",
                        label: "Title",
                        type: "string",
                        required: true,
                        isTitle: true
                      },
                      {
                        name: "uuid",
                        label: "UUID",
                        type: "string",
                      }
                    ],
                    ui: {
                      component: TinaPlacePicker,
                    },
                    required: true,
                  },
                  {
                    name: "caption",
                    label: "Caption",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  }
                ],
              },
            ]
          },
        ],
      },
      {
        name: "place",
        label: "Places",
        path: "content/places",
        fields: [
          {
            name: "name",
            label: "Place Name",
            type: "string",
            required: true,
            isTitle: true,
          },
          {
            name: "core_data_id",
            label: "Core Data Place ID",
            type: "string",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "rich-text",
            isBody: true,
          }
        ]
      },
    ],
  },
});