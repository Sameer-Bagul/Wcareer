###needs to be updated!!!

from fastapi import FastAPI
from pydantic import BaseModel
from stage1 import generate_search_queries
from stage2 import process_search_queries, generate_subheadings

app = FastAPI()

class QueryInput(BaseModel):
    title: str
    language: str

@app.post("/generate_queries")
async def generate_queries(input_data: QueryInput):
    queries = generate_search_queries(input_data.title, input_data.language)
    return {"queries": queries}

@app.post("/search_and_generate")
async def search_and_generate(input_data: QueryInput):
    responses = process_search_queries(input_data.title, input_data.language)
    return {"results": responses}

@app.post("/generate_subheadings")
async def subheading_generation(input_data: QueryInput):
    subheadings = generate_subheadings(input_data.title, input_data.language)
    return {"subheadings": subheadings}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
