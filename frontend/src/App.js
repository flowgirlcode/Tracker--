import React, { useState, useMemo } from 'react'
import styled from "styled-components";
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Calculator from './Components/Interest/Calculator';
import IncomeTable from './Components/Balance/IncomeTable';
import ExpenseTable from './Components/Balance/ExpenseTable';
import Track  from './Components/Month/Track'
import MonthTransaction from './Components/Month/MonthlyTransaction'
import Category from './Components/Balance/Category';
import YrTable from './Components/Month/YearMonth';

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Income />
      case 3:
        return <Expenses />
      case 4:
        return <IncomeTable />
      case 5:
        return <ExpenseTable />

      case 6:
        return <MonthTransaction />
      case 7:
        return <Category />
      case 8:
        return <Track  />
      case 9:
        return <YrTable />

      case 10:
        return <Calculator />

      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AppStyled className="App">

      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color:#271F30;

  main{

    flex: 1;
    background-color:whitesmoke;
    text-transform: capitalize;
    border: 3px solid green;
    backdrop-filter: blur(4.5px);

  }
`;

export default App;
