first->
cd backend 
pip install -r requirements.txt
uvicorn app.main:app --reload

then frontend
cd frontend
npm install
npm run dev