 let maindata = JSON.parse(localStorage.getItem("expenses")) || [];
    const list = document.getElementById('list');
    const bal = document.getElementById('balance');
    const inc = document.getElementById('income');
    const exp = document.getElementById('expense');

    function save() {
      localStorage.setItem("expenses", JSON.stringify(maindata));
    }

    function additem() {
      let type = document.getElementById('type').value;
      let name = document.getElementById('name').value.trim();
      let amount = Number(document.getElementById('amount').value);

      if (name === "" || amount <= 0) {
        alert("Invalid data");
        return;
      }

      maindata.push({
        type: Number(type),
        name,
        amount
      });

      save();
      update();

      document.getElementById('name').value = "";
      document.getElementById('amount').value = "";
    }

    function deleteItem(index) {
      maindata.splice(index, 1);
      save();
      update();
    }

    function update() {
      list.innerHTML = "";
      let income = 0;
      let expense = 0;

      maindata.forEach((item, i) => {
        if (item.type === 1) income += item.amount;
        else expense += item.amount;

        let div = document.createElement('div');
        div.classList.add('item');
        div.classList.add(item.type === 1 ? 'income' : 'expense');

        div.innerHTML = `
          <span>${item.name}</span>
          <span>${item.amount}</span>
          <span class="delete" onclick="deleteItem(${i})">DEL</span>
        `;

        list.appendChild(div);
      });

      bal.innerText = "Rs." + (income - expense);
      inc.innerText = income;
      exp.innerText = expense;
    }

    update();