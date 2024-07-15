import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchSingleBlogData } from '../../API/Functions/SingleBlog.API'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SideBar from '../../Component/SideBar'
import Layout from '../../Layout/Layout'
import BreadCrumbs from '../../Layout/BreadCrumbs'

const BlogDetails = () => {
    const {id}=useParams()
    const dispatch=useDispatch()
    const fetchBlogDetails=async()=>{
        const response=await dispatch(fetchSingleBlogData(id))
        return response.payload.data
    }
    const {data:singleBlogData,isLoading}=useQuery({
        queryKey:['singleBlog',id],
        queryFn:fetchBlogDetails
    })
    console.log(singleBlogData);
  return (
   <>
   <Layout>
    <BreadCrumbs data="Blog Details" />
   <section class="news-single section">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 col-12">
						<div class="row">
							<div class="col-12">
								<div class="single-main">
									<div class="news-head">
										<img src={`${process.env.REACT_APP_BASE_URL}${singleBlogData?.image}`} alt="#"/>
									</div>
									<h1 class="news-title">{singleBlogData?.title}</h1>
									
									<div class="meta">
										<div class="meta-left">
											<span class="author"><a href="#"><img src={`${process.env.REACT_APP_BASE_URL}${singleBlogData?.image}`} alt="#"/>Naimur Rahman</a></span>
											<span class="date"><i class="fa fa-clock-o"></i>03 Feb 2019</span>
										</div>
										<div class="meta-right">
											<span class="comments"><a href="#"><i class="fa fa-comments"></i>05 Comments</a></span>
											<span class="views"><i class="fa fa-eye"></i>33K Views</span>
										</div>
									</div>
									<div class="news-text">
										{singleBlogData?.description}
                                        </div>
									<div class="blog-bottom">
										<ul class="social-share">
											<li class="facebook"><a href="#"><i class="fa fa-facebook"></i><span>Facebook</span></a></li>
											<li class="twitter"><a href="#"><i class="fa fa-twitter"></i><span>Twitter</span></a></li>
											<li class="google-plus"><a href="#"><i class="fa fa-google-plus"></i></a></li>
											<li class="linkedin"><a href="#"><i class="fa fa-linkedin"></i></a></li>
											<li class="pinterest"><a href="#"><i class="fa fa-pinterest"></i></a></li>
										</ul>
										
									</div>
								</div>
							</div>
							<div class="col-12">
								<div class="blog-comments">
									<h2>All Comments</h2>
									<div class="comments-body">
										<div class="single-comments">
											<div class="main">
												<div class="head">
													<img src="img/author1.jpg" alt="#"/>
												</div>
												<div class="body">
													<h4>Afsana Mimi</h4>
													<div class="comment-meta"><span class="meta"><i class="fa fa-calendar"></i>March 05, 2019</span><span class="meta"><i class="fa fa-clock-o"></i>03:38 AM</span></div>
													<p>Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas</p>
													<a href="#"><i class="fa fa-reply"></i>replay</a>
												</div>
											</div>
										</div>		
										<div class="single-comments left">
											<div class="main">
												<div class="head">
													<img src="img/author2.jpg" alt="#"/>
												</div>
												<div class="body">
													<h4>Naimur Rahman</h4>
													<div class="comment-meta"><span class="meta"><i class="fa fa-calendar"></i>March 05, 2019</span><span class="meta"><i class="fa fa-clock-o"></i>03:38 AM</span></div>
													<p>Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas</p>
													<a href="#"><i class="fa fa-reply"></i>replay</a>
												</div>
											</div>
										</div>		
										<div class="single-comments">
											<div class="main">
												<div class="head">
													<img src="img/author3.jpg" alt="#"/>
												</div>
												<div class="body">
													<h4>Suriya Molharta</h4>
													<div class="comment-meta"><span class="meta"><i class="fa fa-calendar"></i>March 05, 2019</span><span class="meta"><i class="fa fa-clock-o"></i>03:38 AM</span></div>
													<p>Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas</p>
													<a href="#"><i class="fa fa-reply"></i>replay</a>
												</div>
											</div>
										</div>											
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-12">
						<SideBar/>
					</div>
				</div>
			</div>
		</section>
        </Layout>
   </>
  )
}

export default BlogDetails
