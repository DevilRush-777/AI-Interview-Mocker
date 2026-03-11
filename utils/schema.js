import { pgTable, serial, varchar,text } from "drizzle-orm/pg-core";


export const Mockinterview=pgTable("mockinterview",{
    id:serial("id").primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDescription:varchar('jobDescription').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
   

}
)