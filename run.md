first->
cd backend 
pip install -r requirements.txt
uvicorn app.main:app --reload

second->
then frontend
cd frontend
npm install
npm run dev