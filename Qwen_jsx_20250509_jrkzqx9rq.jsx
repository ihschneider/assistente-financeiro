import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Estados para despesas, receitas, poupança, cartões e tarefas
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [creditCards, setCreditCards] = useState([
    { id: "visa", name: "Visa - Banco X", limit: 5000, used: 0 },
    { id: "elo", name: "Elo - Sicredi", limit: 3000, used: 0 },
  ]);
  const [tasks, setTasks] = useState([]);

  // Formulários
  const [formExpense, setFormExpense] = useState({
    name: "",
    amount: "",
    installments: "1",
    startDate: new Date().toISOString().split("T")[0],
  });

  const [formIncome, setFormIncome] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [formSaving, setFormSaving] = useState({
    name: "",
    amount: "",
  });

  const [formCard, setFormCard] = useState({
    cardId: "visa",
    description: "",
    amount: "",
    paid: false,
    isInstallment: false,
    installments: "1",
  });

  const [formTask, setFormTask] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Carregar dados do localStorage
  useEffect(() => {
    if (localStorage.getItem("expenses")) setExpenses(JSON.parse(localStorage.getItem("expenses")));
    if (localStorage.getItem("incomes")) setIncomes(JSON.parse(localStorage.getItem("incomes")));
    if (localStorage.getItem("savings")) setSavings(JSON.parse(localStorage.getItem("savings")));
    if (localStorage.getItem("creditCards")) setCreditCards(JSON.parse(localStorage.getItem("creditCards")));
    if (localStorage.getItem("tasks")) setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem("savings", JSON.stringify(savings));
  }, [savings]);

  useEffect(() => {
    localStorage.setItem("creditCards", JSON.stringify(creditCards));
  }, [creditCards]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funções de adição
  const addExpense = () => {
    const totalInstallments = parseInt(formExpense.installments);
    const amount = parseFloat(formExpense.amount);
    const monthlyAmount = amount / totalInstallments;

    for (let i = 0; i < totalInstallments; i++) {
      const date = new Date(formExpense.startDate);
      date.setMonth(date.getMonth() + i);

      expenses.push({
        id: Math.random().toString(36).substr(2, 9),
        name: formExpense.name,
        amount: monthlyAmount,
        dueDate: date.toISOString().split("T")[0],
        paid: false,
        installmentNumber: i + 1,
        totalInstallments: totalInstallments,
      });
    }

    setExpenses([...expenses]);
    setFormExpense({ ...formExpense, name: "", amount: "", installments: "1" });
  };

  const addIncome = () => {
    incomes.push({
      id: Math.random().toString(36).substr(2, 9),
      ...formIncome,
    });
    setIncomes([...incomes]);
    setFormIncome({ source: "", amount: "", date: new Date().toISOString().split("T")[0] });
  };

  const addSaving = () => {
    savings.push({
      id: Math.random().toString(36).substr(2, 9),
      ...formSaving,
    });
    setSavings([...savings]);
    setFormSaving({ name: "", amount: "" });
  };

  const addCardExpense = () => {
    const amount = parseFloat(formCard.amount);
    const cardIndex = creditCards.findIndex((c) => c.id === formCard.cardId);

    if (cardIndex !== -1) {
      if (formCard.isInstallment) {
        const installments = parseInt(formCard.installments);
        const monthly = amount / installments;
        for (let i = 0; i < installments; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() + i);
          tasks.push({
            id: Math