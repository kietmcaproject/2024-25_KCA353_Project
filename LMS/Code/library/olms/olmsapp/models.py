from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class CustomUser(AbstractUser):
    USER = (
        (1, 'admin'),
        (2, 'students'),
    )
    user_type = models.IntegerField(choices=USER, default=1)  # Changed to IntegerField
    
    profile_pic = models.ImageField(upload_to='media/profile_pic', blank=True, null=True)  # Optional field for profile pic

class Category(models.Model):
    catname = models.CharField(max_length=200)
    status = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.catname

class Author(models.Model):
    authorname = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.authorname

class Book(models.Model):
    bookname = models.CharField(max_length=200)
    catid = models.ForeignKey(Category, on_delete=models.CASCADE)
    authid = models.ForeignKey(Author, on_delete=models.CASCADE)
    isbnnum = models.CharField(max_length=200, unique=True)
    price = models.CharField(max_length=200)
    bookimage = models.ImageField(upload_to='book_img/', blank=True, null=True)  # Optional field for book image
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    isIssued = models.CharField(max_length=50,default=None)
    tcopies  = models.CharField(max_length=200)
    acopies  = models.CharField(max_length=200)
    issuedcopies  = models.CharField(max_length=200)
    ncopies  = models.CharField(max_length=200)
    def __str__(self):
        return self.bookname

class Student(models.Model):
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    mobilenumber = models.CharField(max_length=11, default=None,blank=True,)
    studentid = models.CharField(max_length=50, unique=True)
    regdate_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.studentid



class Issuedbookdetails(models.Model):
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    stud_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    issued_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(auto_now=True)
    return_status = models.CharField(max_length=50)
    fine = models.DecimalField(max_digits=10, decimal_places=2,default=0)
