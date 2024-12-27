from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from olmsapp.models import CustomUser,Category,Author,Book,Student,Issuedbookdetails
from django.contrib.auth import get_user_model
from django.http import JsonResponse

User = get_user_model()


def ping_session(request):
    # This view is just to keep the session alive
    return JsonResponse({'status': 'success'})

def BASE(request):    
       return render(request,'base.html')

def Index(request):    
       return render(request,'index.html')

def LOGIN(request):
    return render(request,'login.html')

def doLogin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user_type = user.user_type
            if user_type == '1' or user_type == 1:  # Check for both string and integer comparison
                return redirect('dashboard')
            elif user_type == '2' or user_type == 2:  # Check for both string and integer comparison
                return redirect('dashboard')
        else:
            messages.error(request, 'Username or Password is not valid')
        
        # If authentication fails or user_type doesn't match expected values, redirect to login page
        return redirect('login')

    else:
        # If the request method is not POST, redirect to the login page with an error message
        messages.error(request, 'Invalid request method')
        return redirect('login')

def doLogout(request):
    logout(request)
    return redirect('login')

@login_required(login_url = '/')
def DASHBOARD(request):
    cat_count = Category.objects.all().count()
    author_count = Author.objects.all().count()
    book_count = Book.objects.all().count()
    issbook_count = Book.objects.filter(isIssued=True).count()  # Corrected the filter
    regusers_count = Student.objects.all().count()
    retbook_count = Book.objects.filter(isIssued='Return').count()

    context = {
        'cat_count': cat_count,
        'author_count': author_count,
        'book_count': book_count,
        'issbook_count': issbook_count,
        'regusers_count': regusers_count,
        'retbook_count' : retbook_count,
    } 

    return render(request, 'dashboard.html', context)


@login_required(login_url = '/')
def ADMIN_PROFILE(request):
    user = CustomUser.objects.get(id = request.user.id)
    context = {
        "user":user,
    }
    return render(request,'profile.html',context)

@login_required(login_url = '/')
def ADMIN_PROFILE_UPDATE(request):
    if request.method == "POST":
        profile_pic = request.FILES.get('profile_pic')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        username = request.POST.get('username')
        print(profile_pic)
        

        try:
            customuser = CustomUser.objects.get(id = request.user.id)
            customuser.first_name = first_name
            customuser.last_name = last_name
           
            customuser.email = email

            
            if profile_pic !=None and profile_pic != "":
               customuser.profile_pic = profile_pic
            customuser.save()
            messages.success(request,"Your profile has been updated successfully")
            return redirect('admin_profile')

        except:
            messages.error(request,"Your profile updation has been failed")
    return render(request, 'profile.html')


login_required(login_url='/')
def CHANGE_PASSWORD(request):
     context ={}
     ch = User.objects.filter(id = request.user.id)
     
     if len(ch)>0:
            data = User.objects.get(id = request.user.id)
            context["data"]:data            
     if request.method == "POST":        
        current = request.POST["cpwd"]
        new_pas = request.POST['npwd']
        user = User.objects.get(id = request.user.id)
        un = user.username
        check = user.check_password(current)
        if check == True:
          user.set_password(new_pas)
          user.save()
          messages.success(request,'Password Change  Succeesfully!!!')
          user = User.objects.get(username=un)
          login(request,user)
        else:
          messages.success(request,'Current Password wrong!!!')
          return redirect("change_password")
     return render(request,'change-password.html')