import{
    FastifyInstance,
    FastifyPluginOptions,
    FastifyRequest,
    FastifyReply
} from 'fastify'

import { CreateNutritionController } from './controllers/CreateNutritionController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    
    fastify.get("/test", (request: FastifyRequest, reply: FastifyReply) => {

        let responseText = "```json\n{\n  \"nome\": \"Elias\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 26,\n  \"altura\": 1.8,\n  \"peso\": 60,\n  \"objetivo\": \"Hipertrofia\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"08:00\",\n      \"nome\": \"Cafe da Manha\",\n      \"alimentos\": [\n        \"2 fatias de pao integral\",\n        \"2 ovos mexidos\",\n        \"1 banana\",\n        \"200ml de leite desnatado\",\n        \"1 colher de sopa de azeite de oliva\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da Manha\",\n        \"alimentos\": [\n        \"1 iogurte grego natural\",\n        \"1 scoop de whey protein\",\n        \"1 colher de sopa de granola\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoco\",\n      \"alimentos\": [\n        \"150g de frango grelhado\",\n        \"100g de batata doce\",\n        \"1 concha de arroz integral\",\n        \"100g de brócolis\",\n        \"Salada verde a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da Tarde\",\n        \"alimentos\": [\n        \"1 batata doce\",\n        \"1 scoop de whey protein\"\n      ]\n    },\n    {\n      \"horario\": \"20:00\",\n      \"nome\": \"Jantar\",\n      \"alimentos\": [\n        \"150g de peixe grelhado\",\n        \"100g de batata doce\",\n        \"1 concha de arroz integral\",\n        \"100g de espinafre\",\n        \"Salada verde a vontade\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Whey Protein\",\n    \"Creatina\",\n    \"BCAA\"\n  ]\n}\n```"

        try{
            //extrair o json
            let jsonString = responseText.replace(/```\w*/g, '').replace(/\n ```/g, '').trim()
            
            let jsonObject = JSON.parse(jsonString)

            return reply.send({ data: jsonObject });
        }
        catch(err){
            console.log(err)
        }
        reply.send({ok: true})
    })
    fastify.post("/create", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateNutritionController().handle(request, reply)
    })
}