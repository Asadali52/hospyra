export type MenuTableItem = {
  id: string;
  item: string;
  category: 'Appetizers' | 'Mains' | 'Desserts' | 'Drinks';
  cost: string;
  price: string;
  margin: number;
  sales: number;
  rating: number;
  status: 'Best Seller' | 'Low Margin';
};

export type OrderTableItem = {
  id: string;
  orderId: string;
  category: string;
  vendor: string;
  amount: string;
  orderDate: string;
  status: 'Delivered' | 'In Transit' | 'Pending';
};

export type RequestTableItem = {
  id: string;
  requestId: string;
  title: string;
  category: 'Food' | 'Staffing' | 'Marketing' | 'Construction' | 'Equipment' | 'Emergency';
  priority: 'high' | 'medium' | 'low';
  status: 'In Progress' | 'Pending' | 'Completed';
  submitted: string;
  assignedTo: string;
};

export const menuTableRowsData: MenuTableItem[] = [
  { id: '1', item: 'Grilled Salmon', category: 'Mains', cost: '$8.50', price: '$24.99', margin: 66, sales: 145, rating: 4.8, status: 'Best Seller' },
  { id: '2', item: 'Caesar Salad', category: 'Appetizers', cost: '$3.20', price: '$9.99', margin: 68, sales: 203, rating: 4.6, status: 'Best Seller' },
  { id: '3', item: 'Wagyu Burger', category: 'Mains', cost: '$12.00', price: '$18.99', margin: 37, sales: 98, rating: 4.9, status: 'Low Margin' },
  { id: '4', item: 'Filet Mignon', category: 'Appetizers', cost: '$18.50', price: '$42.99', margin: 57, sales: 187, rating: 4.7, status: 'Best Seller' },
  { id: '5', item: 'Chocolate Lava Cake', category: 'Desserts', cost: '$2.90', price: '$8.99', margin: 68, sales: 67, rating: 4.9, status: 'Best Seller' },
  { id: '6', item: 'Craft Cocktail', category: 'Drinks', cost: '$2.20', price: '$14.00', margin: 84, sales: 240, rating: 4.8, status: 'Best Seller' },
];

export const ordersTableRowsData: OrderTableItem[] = [
  { id: '1', orderId: 'ORD-1234', category: 'Food', vendor: 'Fresh Farms Co', amount: '$1,250.00', orderDate: '4/1/2026', status: 'Delivered' },
  { id: '2', orderId: 'ORD-1235', category: 'Beverage', vendor: "Ocean's Best", amount: '$890.50', orderDate: '3/31/2026', status: 'In Transit' },
  { id: '3', orderId: 'ORD-1236', category: 'Food', vendor: 'Wine Distributors', amount: '$2,100.00', orderDate: '3/30/2026', status: 'Delivered' },
  { id: '4', orderId: 'ORD-1237', category: 'Equipment', vendor: 'Kitchen Supply Pro', amount: '$450.00', orderDate: '3/28/2026', status: 'Pending' },
  { id: '5', orderId: 'ORD-1238', category: 'Supplies', vendor: 'Green Valley', amount: '$680.00', orderDate: '3/27/2026', status: 'Delivered' },
];

export const requestsTableRowsData: RequestTableItem[] = [
  { id: '1', requestId: 'REQ-001', title: 'Replace broken oven', category: 'Equipment', priority: 'high', status: 'In Progress', submitted: '3/30/2026', assignedTo: 'Hosperra Team' },
  { id: '2', requestId: 'REQ-002', title: 'Add vegan menu options', category: 'Food', priority: 'medium', status: 'Pending', submitted: '3/29/2026', assignedTo: 'Menu Team' },
  { id: '3', requestId: 'REQ-003', title: 'Hire weekend bartender', category: 'Staffing', priority: 'low', status: 'Completed', submitted: '3/25/2026', assignedTo: 'HR Team' },
  { id: '4', requestId: 'REQ-004', title: 'Update restaurant logo', category: 'Marketing', priority: 'high', status: 'Pending', submitted: '3/28/2026', assignedTo: 'Design Team' },
  { id: '5', requestId: 'REQ-005', title: 'Fix leaking sink', category: 'Construction', priority: 'medium', status: 'Pending', submitted: '3/28/2026', assignedTo: 'Maintenance' },
];
