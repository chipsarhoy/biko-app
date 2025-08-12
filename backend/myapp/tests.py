from django.db.models import Sum
from django.test import TestCase
from .models import Customer, Order, OrderItems, Menu
# Create your tests here.

class CustomerOrderIntegrationTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.customer = Customer.objects.create(
            first_name="John", 
            last_name="Doe", 
            email="johndoe@gmail.com", 
            phone="2131111111"
        )

        cls.customer1 = Customer.objects.create(
            first_name="Jane",
            last_name="Woah",
            email="janewoah@yahoo.com",
            phone="7141111111"
        )

        cls.menu = Menu.objects.create(
            name = "Biko",
            description = "Sweet rice cake made from coconut milk, brown sugar, and sticky rice.",
            price = 9.99
        )

        cls.menu1 = Menu.objects.create(
            name = "Castella Cake",
            description = "Japanese styled fluffy cake made from eggs, milk, mizuame, and vanilla extract.",
            price = 15.99
        )

        cls.order = Order.objects.create(
                    Customer_ID = Customer.objects.get(pk=1),
                    price_total = 0.0,
                    price_subtotal = 0.0,
                    price_tax = 0.0
                )
        
        cls.orderItems = OrderItems.objects.create(
            quantity = 2,
            Menu_ID = Menu.objects.get(pk=1),
            Order_ID = Order.objects.get(pk=1)
        )

        cls.orderItems1 = OrderItems.objects.create(
            quantity = 2,
            Menu_ID = Menu.objects.get(pk=2),
            Order_ID = Order.objects.get(pk=1)
        )

    def test_fields(self):

        self.assertIsInstance(self.customer.first_name, str)
        self.assertIsInstance(self.customer.last_name, str)
        self.assertIsInstance(self.customer.email, str)
        self.assertIsInstance(self.customer.phone, str)

        self.assertIsInstance(self.customer1.first_name, str)
        self.assertIsInstance(self.customer1.last_name, str)
        self.assertIsInstance(self.customer1.email, str)
        self.assertIsInstance(self.customer1.phone, str)

        self.assertIsInstance(self.menu.name, str)
        self.assertIsInstance(self.menu.description, str)
        self.assertIsInstance(self.menu.price, float)

        self.assertIsInstance(self.menu1.name, str)
        self.assertIsInstance(self.menu1.description, str)
        self.assertIsInstance(self.menu1.price, float)
        
        self.assertIsInstance(self.order.Customer_ID, Customer)
        self.assertIsInstance(self.order.price_total, float)
        self.assertIsInstance(self.order.price_subtotal, float)
        self.assertIsInstance(self.order.price_tax, float)
        
        self.assertIsInstance(self.orderItems.quantity, int)
        self.assertIsInstance(self.orderItems.Menu_ID, Menu)
        self.assertIsInstance(self.orderItems.Order_ID, Order)

        self.assertIsInstance(self.orderItems1.quantity, int)
        self.assertIsInstance(self.orderItems1.Menu_ID, Menu)
        self.assertIsInstance(self.orderItems1.Order_ID, Order)

    def test_get(self):

        customerData = Customer.objects.get(first_name="John")

        self.assertEqual(customerData.first_name, "John")
        self.assertEqual(customerData.last_name, "Doe")
        self.assertEqual(customerData.email, "johndoe@gmail.com")
        self.assertEqual(customerData.phone, "2131111111")

        menuData = Menu.objects.get(pk=1)

        self.assertEqual(menuData.name, "Biko")
        self.assertEqual(menuData.description, "Sweet rice cake made from coconut milk, brown sugar, and sticky rice.")
        self.assertEqual(menuData.price, 9.99)

        menuData1 = Menu.objects.get(pk=2)

        self.assertEqual(menuData1.name, "Castella Cake")
        self.assertEqual(menuData1.price, 15.99)

    def test_update(self):

        Customer.objects.filter(pk=1).update(phone="2132222222")

        newData = Customer.objects.get(pk=1)

        self.assertEqual(newData.phone, "2132222222")

        menu_id = OrderItems.objects.filter(
            Order_ID = Order.objects.get(pk=1)
            ).values_list("Menu_ID", flat=True)
        #print(len(subtotalOrder))
                        
        for i in menu_id:
            print(menu_id[i-1])
            sub_total = Menu.objects.aggregate(Sum("price"))
        print(sub_total)
        
        Order.objects.filter(pk=1).update(price_subtotal = sub_total['price__sum'])

        self.assertEqual(Order.objects.get(pk=1).price_subtotal, 15.99+9.99)            