from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from olmsapp.models import CustomUser,Category,Author,Book,Student,Issuedbookdetails
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

import random
User = get_user_model()


def ping_session(request):
    # This view is just to keep the session alive
    return JsonResponse({'status': 'success'})


def STUDENT_REG(request):    
    if request.method == "POST":
        random_digits = random.randint(1000, 9999)
        studentid = f"SS{random_digits}"
        pic = request.FILES.get('pic')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        mobno = request.POST.get('mobno')
        
        password = request.POST.get('password')

        if CustomUser.objects.filter(email=email).exists():
            messages.warning(request,'Email already exist')
            return redirect('signup')
        if CustomUser.objects.filter(username=username).exists():
            messages.warning(request,'Username already exist')
            return redirect('signup')
        
        else:
            user = CustomUser(
               first_name=first_name,
               last_name=last_name,
               username=username,
               email=email,
               
               user_type=2,
               profile_pic = pic,
            )
            user.set_password(password)
            user.save()
            
            student = Student(
                admin = user,
                studentid= studentid,
                mobilenumber=mobno,
            )
            student.save()            
            messages.success(request,'Signup Successfully')
            return redirect('signup')

    return render(request,'student/registration.html')

@login_required(login_url='/')
def ISSUEDBOOKS(request):
    stu_admin = request.user
    stu_reg = Student.objects.get(admin=stu_admin)
    
    issuebook_list = Issuedbookdetails.objects.filter(stud_id=stu_reg)
    paginator = Paginator(issuebook_list, 10)  # Show 10 issued_books per page

    page_number = request.GET.get('page')
    try:
        issued_books = paginator.page(page_number)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        issued_books = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        issued_books = paginator.page(paginator.num_pages)

    context = {'issued_books': issued_books,
    }
    return render(request, 'student/issuedbooks.html', context)

@login_required(login_url='/')
def BOOKSDETAILS(request):    
       return render(request,'student/books_details.html')




@login_required(login_url='/')
def BOOKSDETAILS(request):
    
    book_list = Book.objects.all()
    paginator = Paginator(book_list, 12)  # Show 10 books per page

    page_number = request.GET.get('page')
    try:
        books = paginator.page(page_number)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        books = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        books = paginator.page(paginator.num_pages)

    context = {'books': books,
    }
    return render(request, 'student/books_details.html', context)

