import './App.css';
import { Header } from './components/layout/Header';
import { CheckListCard } from './components/checklist/CheckListCard';
import { mockData } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockData.lists.map((checkList) => (
            <CheckListCard key={checkList.slug} checkList={checkList} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
